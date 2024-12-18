"use server";
import { NextResponse } from 'next/server';
// import { signIn } from "../auth";
import bcrypt from "bcrypt";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const addUser = async (formData) => {
    try {
        const { firstname, lastname, email, password, userType } = Object.fromEntries(formData);
        const response = await fetch(process.env.URL + '/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password,
                userType,
            }),
        });

        const result = await response.json();
        return { success: true };
    } catch (err) {
        return { success: false };
    }

    // (result);
}

export const authenticate = async (formData) => {
    const { email, password } = Object.fromEntries(formData);
    // const router = useRouter();
    const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.URL : 'http://localhost:3000';

    // ("process.env.URL..", BASE_URL);

    try {
        const response = await fetch(BASE_URL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // navigate to dashboard
            // setCookie('branded-token', data.token);
            return { success: true, message: data.message, token: data.token };
        } else {
            // Handle errors (e.g., wrong password)
            console.error('Login failed:', data.error);
            // setError(data.error || 'Login failed');
        }
    } catch (err) {
        console.error('Login error:', err);
    }
};

export const uploadScript = async (formData) => {
    const cookieStore = cookies(); // Get the cookies object
    const token = cookieStore.get('bstreams')?.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const formDataNew = new FormData();
    for (const [key, value] of formData.entries()) {
        formDataNew.append(key, value);
    }

    formDataNew.append("user_id", decoded.userId);
    const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.URL : 'http://localhost:3000';
    try {
        const response = await axios.post(BASE_URL + '/api/upload', formDataNew, {
            onUploadProgress: (progressEvent) => {
                // ("Progress..");
            },
        });
        return response.data;
        // ("File uploaded successfully:", response.data);
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}

export const getScriptDetails = async () => {
    const cookieStore = cookies(); // Get the cookies object
    const token = cookieStore.get('bstreams')?.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ("Decoded..", decoded);
    const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.URL : 'http://localhost:3000';
    try {
        const response = await axios.get(BASE_URL + '/api/getScripts', {
            params: {
                userId: decoded.userId
            }
        });
        ("Response...", response);
        return response.data;
    } catch (error) {
        console.error("Error geting script details file:", error);
    }
}