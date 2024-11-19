"use server"
import fetch from 'node-fetch';
import { IncomingForm } from 'formidable';
import FormData from 'form-data';
import { cookies } from 'next/headers';
import fs from "fs";
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/app/lib/session';
import { getCookie } from 'cookies-next';

export const config = {
    api: {
        bodyParser: false, // Disable body parsing to handle the file manually
    },
};

export default async function upload(req, res) {
    if (req.method === 'POST') {
        const form = new IncomingForm();
        // authenticateToken(req, res, () => {
        //     // Proceed with the route logic after token verification
        //     console.log("user... ", req.user);
        //     // res.status(200).json({ message: 'You have access to this protected route', user: req.user });
        // });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                return res.status(500).json({ message: 'File parsing error' });
            }

            // Access the uploaded file's buffer
            // const fileBuffer = files.file[0].buffer; // If formidable has configured to use buffers
            const fileBuffer = fs.readFileSync(files?.file[0]?.filepath);
            const originalFilename = files.file[0].originalFilename;
            try {
                const formData = new FormData();
                formData.append('file', fileBuffer, originalFilename);
                formData.append('user_file_name', fields.user_file_name[0]);
                formData.append('user_content_type', fields.user_content_type[0]);
                formData.append('user_id', fields.user_id[0]);

                const response = await fetch('https://scriptsassistantv5.azurewebsites.net/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                console.log("Uploaded response...", response);

                if (response.ok) {
                    res.status(200).json({ message: 'File uploaded successfully!' });
                } else {
                    console.log("response...", response);
                    // res.status(500).json({ message: 'Error uploading file to external endpoint.' });
                }
            } catch (error) {
                console.error('Error forwarding file:', error);
                res.status(500).json({ message: 'Server error.' });
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}