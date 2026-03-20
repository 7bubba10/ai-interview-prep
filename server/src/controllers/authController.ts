import { Request, Response } from "express";
import bcrypt, { hash } from 'bcrypt';
import pool from "../db";
import jwt  from "jsonwebtoken";

export const register = async(req:Request,res:Response) =>  {
    const { email, password } = req.body as {email:string; password:string};

    const hash_password = await bcrypt.hash(password, 10);

    const result = await pool.query('insert into users (email, hash_password) values ($1,$2) returning id',
        [email,hash_password]);

    const token = jwt.sign({id: result.rows[0].id}, process.env.JWT_SECRET as string, {expiresIn: '7d'});

    res.status(201).json({token, userID: result.rows[0].id});



}

export const login = async(req:Request,res:Response) =>  {
    const { email, password } = req.body as {email:string; password:string};

    const result = await pool.query('select * from users where email = ($1)', [email]);

    if (result.rows.length === 0) res.status(401).json({ message: 'Invalid credentials' });

    const user = result.rows[0];

    const compare_pass = await bcrypt.compare(password,user.hash_password);

    if (!compare_pass){
        res.status(401).json({ message: 'Invalid credentials' });
    } else {
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string, {expiresIn: '7d'});
        res.status(200).json({token, userID: result.rows[0].id});
    }



}