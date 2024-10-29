"use server";
import { NextResponse } from 'next/server';
import { signIn } from "../auth";
import bcrypt from "bcrypt";

export const addUser = async (formData) => {
    const { firstname, lastname, email, password, type } = Object.fromEntries(formData);
    const response = await fetch(process.env.URL + '/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            userType: type,
        }),
    });

    const result = await response.json();
    console.log(result);
}

export const authenticate = async (formData) => {
    const { email, password } = Object.fromEntries(formData);
    // const router = useRouter();
    const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.URL : 'http://localhost:3000';

    console.log("process.env.URL..", BASE_URL);

    try {
        const response = await fetch(BASE_URL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // navigate to dashboard
            return { success: true, message: data.message };
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
    const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.URL : 'http://localhost:3000';
    console.log("BASE_URL:", BASE_URL);

    const response = await fetch(BASE_URL + '/api/upload', {
        method: 'POST',
        body: formData, // Directly sending FormData
    });

    console.log('Response status:', response.status); // Log response status

    const text = await response.text(); // Get raw text for debugging
    console.log('Response body:', text); // Log response body

    let data;
    try {
        data = JSON.parse(text);
    } catch (error) {
        console.error('Failed to parse response as JSON:', error);
        throw new Error('Failed to parse response');
    }

    if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
    }

    return { success: true, message: data.message };
}

