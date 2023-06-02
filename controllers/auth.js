import { db } from '../connect.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req,res)=>{

    //เป็นการเช็คว่ามีชื่อผู้ใช้นี้อยู่ในระบบแล้วหรือไม่
    const q = "SELECT * FROM tbl_users WHERE username = ?"
    db.query(q,[req.body.username], (err,data)=>{
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("มีผู้ใช้นี้อยู่แล้ว!");

        //เป็นการเข้ารหัสผ่านแบบ bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        //เป็นการ Insert ลงฐานข้อมูล
        const q = "INSERT INTO tbl_users (`username`,`email`,`password`,`name`) VALUE (?)";
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.name,            
          ];
      
        db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("สร้างผู้ใช้ใหม่แล้ว.");
        });          
    })
}


export const login = (req,res)=>{
  const q = "SELECT * FROM tbl_users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("ไม่พบชื่ออีเมล์ผู้ใช้!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
        return res.status(400).json("รหัสผ่านหรือชื่ออีเมล์ผู้ใช้ไม่ถูกต้อง!");
        const token = jwt.sign({ id: data[0].id }, "secretkey");
        const { password, ...others } = data[0];
        res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json(others);
    });
}



export const logout = (req,res)=>{
    res.clearCookie("access_token",{
    secure:true,
    sameSite:"none"
    }).status(200).json("ผู้ใช้ออกจากระบบแล้ว")
    
}