import { IncomingForm } from 'formidable';

// Disable the default body parser in Next.js
export const config = {
    api: {
        bodyParser: false, // Disable default body parser to handle multipart/form-data
    },
};

export default async function upload(req, res) {
    console.log('API route hit'); // Log when the route is hit

    if (req.method === 'POST') {
        const form = new IncomingForm(); // Create a new IncomingForm instance

        // Parse the incoming request
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing FormData:', err);
                return res.status(500).json({ success: false, message: 'Error parsing FormData' });
            }

            // Log the parsed fields and files
            console.log('Parsed fields:', fields); // Log all fields received
            console.log('Parsed files:', files);   // Log all files received

            // Access the specific file using the key 'file'
            const file = files.file; // Make sure this key matches what you used in formData.append('file', ...)

            // Check if the file was received correctly
            if (!file || Array.isArray(file)) {
                console.error('Expected a single file but received:', file);
                return res.status(400).json({ success: false, message: 'No valid file uploaded' });
            }

            // Proceed with your logic here
            try {
                // Optionally, you can now send the file to an external API or process it
                const response = await fetch('https://scriptsassistantv3.azurewebsites.net/api/upload', {
                    method: 'POST',
                    body: JSON.stringify({
                        // Include necessary data from fields and the file path
                        file,
                        user_file_name: fields.user_file_name,
                        user_content_type: fields.user_content_type,
                        user_id: fields.user_id,
                        // You can include file details here if needed
                    }),
                    headers: {
                        'Content-Type': 'application/json', // Adjust the content type as needed
                    },
                });

                const data = await response.json();
                res.status(200).json({ success: true, data }); // Send the response back to the client
            } catch (error) {
                console.error('Error processing the file:', error);
                res.status(500).json({ success: false, message: error.message });
            }
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' }); // Handle non-POST requests
    }
}
