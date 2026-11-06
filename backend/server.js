const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Fix SSL cert verification for Node.js 24+ in development
// (Supabase uses certs that Node 24 strict TLS can't verify without system CA)
// Fix SSL cert verification for Node.js 24+ in development if explicitly enabled
if (process.env.NODE_ENV !== 'production' && process.env.ALLOW_INSECURE_TLS === 'true') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const supabase = require('./supabaseClient');

const app = express();

// Configure allowed origins for local development and production
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];

if (process.env.FRONTEND_URL) {
    const formatted = process.env.FRONTEND_URL.trim().replace(/\/+$/, '');
    if (formatted && !allowedOrigins.includes(formatted)) {
        allowedOrigins.push(formatted);
    }
}

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('FoodShare Backend Running 🚀');
});

app.get('/test-db', async (req, res) => {
    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) {
        return res.status(500).json(error);
    }

    res.json(data);
});
//testdb
app.post('/register', async (req, res) => {
    const { 
        name, 
        email, 
        phone, 
        role, 
        address, 
        donor_type, 
        ngo_reg_id, 
        is_verified, 
        points, 
        badges, 
        avatarUrl 
    } = req.body;

    const userRecord = {
        name,
        email,
        phone,
        role: role || 'donor'
    };
    if (address !== undefined) userRecord.address = address;
    if (donor_type !== undefined) userRecord.donor_type = donor_type;
    if (ngo_reg_id !== undefined) userRecord.ngo_reg_id = ngo_reg_id;
    if (is_verified !== undefined) userRecord.is_verified = is_verified;
    if (points !== undefined) userRecord.points = points;
    if (badges !== undefined) userRecord.badges = badges;
    if (avatarUrl !== undefined) userRecord.avatarUrl = avatarUrl;

    const { data, error } = await supabase
        .from('users')
        .insert([userRecord])
        .select();

    if (error) {
        return res.status(500).json(error);
    }

    res.status(201).json(data);
});

app.get('/users', async (req, res) => {
    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) {
        return res.status(500).json(error);
    }

    res.status(200).json(data);
});

app.get('/food', async (req, res) => {
    const { data, error } = await supabase
        .from('food_donations')
        .select('*');

    if (error) return res.status(500).json(error);

    res.status(200).json(data);
});

app.get('/food/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('food_donations')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(500).json(error);

    res.status(200).json(data);
});

app.put('/food/:id', async (req, res) => {
    const { id } = req.params;
    // Accept any subset of updatable fields
    const {
        status,
        food_name,
        quantity,
        description,
        expiry_time,
        location,
        category,
        veg_non_veg,
        pickup_time,
        contact_number,
        image_url,
        assigned_ngo_id,
        assigned_ngo_name
    } = req.body;

    // Build update object with only provided fields
    const updateFields = {};
    if (status !== undefined)           updateFields.status = status;
    if (food_name !== undefined)        updateFields.food_name = food_name;
    if (quantity !== undefined)         updateFields.quantity = quantity;
    if (description !== undefined)      updateFields.description = description;
    if (expiry_time !== undefined)      updateFields.expiry_time = expiry_time;
    if (location !== undefined)         updateFields.location = location;
    if (category !== undefined)         updateFields.category = category;
    if (veg_non_veg !== undefined)      updateFields.veg_non_veg = veg_non_veg;
    if (pickup_time !== undefined)      updateFields.pickup_time = pickup_time;
    if (contact_number !== undefined)   updateFields.contact_number = contact_number;
    if (image_url !== undefined)        updateFields.image_url = image_url;
    if (assigned_ngo_id !== undefined)  updateFields.assigned_ngo_id = assigned_ngo_id;
    if (assigned_ngo_name !== undefined) updateFields.assigned_ngo_name = assigned_ngo_name;

    const { data, error } = await supabase
        .from('food_donations')
        .update(updateFields)
        .eq('id', id)
        .select('*');

    if (error) return res.status(500).json(error);

    res.status(200).json(data);
});


app.post('/food', async (req, res) => {
    const {
        food_name,
        quantity,
        description,
        expiry_time,
        location,
        latitude,
        longitude,
        donor_id,
        donor_name,
        category,
        veg_non_veg,
        pickup_time,
        contact_number,
        image_url
    } = req.body;

    const { data, error } = await supabase
        .from('food_donations')
        .insert([{
            food_name,
            quantity,
            description,
            expiry_time,
            location,
            latitude,
            longitude,
            donor_id,
            donor_name,
            category,
            veg_non_veg,
            pickup_time,
            contact_number,
            image_url,
            status: 'available'
        }])
        .select('*');

    if (error) return res.status(500).json(error);

    res.status(201).json(data);
});


app.delete('/food/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('food_donations')
        .delete()
        .eq('id', id);

    if (error) return res.status(500).json(error);

    res.status(200).json({ message: "Food deleted", data });
});

app.post('/pickup', async (req, res) => {
    const { food_id, ngo_id } = req.body;

    const { data, error } = await supabase
        .from('pickup_requests')
        .insert([
            {
                food_id,
                ngo_id,
                status: 'pending'
            }
        ])
        .select();

    if (error) {
        return res.status(500).json(error);
    }

    res.status(201).json(data);
});

app.put('/pickup/:id', async (req, res) => {
    const { id } = req.params;
    const { status, ngo_id } = req.body;

    // 1. update pickup status
    const { data, error } = await supabase
        .from('pickup_requests')
        .update({ status })
        .eq('id', id)
        .select();

    if (error) return res.status(500).json(error);

    // 2. AUTO NOTIFICATION LOGIC
    let message = "";

    if (status === "approved") {
        message = "Your food request has been APPROVED 🎉";
    } else if (status === "rejected") {
        message = "Your food request was REJECTED ❌";
    } else if (status === "completed") {
        message = "Food has been DELIVERED 🚚";
    }

    if (message) {
        await supabase
            .from('notifications')
            .insert([
                {
                    user_id: ngo_id,
                    message: message
                }
            ]);
    }

    res.status(200).json(data);
});

app.get('/notifications/:user_id', async (req, res) => {
    const { user_id } = req.params;

    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false });

    if (error) {
        return res.status(500).json(error);
    }

    res.status(200).json(data);
});

app.post('/notifications', async (req, res) => {
    const { user_id, message } = req.body;

    const { data, error } = await supabase
        .from('notifications')
        .insert([
            {
                user_id,
                message
            }
        ])
        .select();

    if (error) {
        return res.status(500).json(error);
    }

    res.status(201).json(data);
});

app.get('/pickup', async (req, res) => {
    const { data, error } = await supabase
        .from('pickup_requests')
        .select('*');

    if (error) {
        return res.status(500).json(error);
    }

    res.status(200).json(data);
});

app.get('/pickup/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('pickup_requests')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(500).json(error);

    res.status(200).json(data);
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const {
        is_verified,
        points,
        badges,
        ngo_reg_id,
        address,
        donor_type,
        role,
        name,
        email,
        phone
    } = req.body;

    const updateFields = {};
    if (is_verified !== undefined) updateFields.is_verified = is_verified;
    if (points !== undefined) updateFields.points = points;
    if (badges !== undefined) updateFields.badges = badges;
    if (ngo_reg_id !== undefined) updateFields.ngo_reg_id = ngo_reg_id;
    if (address !== undefined) updateFields.address = address;
    if (donor_type !== undefined) updateFields.donor_type = donor_type;
    if (role !== undefined) updateFields.role = role;
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (phone !== undefined) updateFields.phone = phone;

    const { data, error } = await supabase
        .from('users')
        .update(updateFields)
        .eq('id', id)
        .select('*');

    if (error) return res.status(500).json(error);

    res.status(200).json(data);
});

// AI Assistant endpoint - safely proxies Groq API requests on the backend
app.post('/api/chat', async (req, res) => {
    const { message, language } = req.body;
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return res.status(503).json({ 
            error: "Groq API key not configured on server. Set GROQ_API_KEY in the backend environment." 
        });
    }

    try {
        const systemInstruction = `You are a helpful Food Rescue Expert AI Assistant. The user's language preference code is '${language || 'en'}'. 
If they provide a food donation scenario (e.g. "I have 20 vegetable biryani packets prepared at 1 PM"), you must respond strictly using this format:
- Category: [Cooked Food/Raw/Packaged]
- Estimated Safe Duration: [hours]
- Suggested Expiry: [Time]
- Recommended Action: [Donate within X hours]

For all other questions, be helpful, concise, and focused on food rescue, donation, and safety.`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                temperature: 0.2,
                messages: [
                    { role: "system", content: systemInstruction },
                    { role: "user", content: message }
                ]
            })
        });

        if (!response.ok) {
            const errData = await response.text();
            console.error("Groq API error response:", errData);
            return res.status(response.status).json({ error: "AI service returned an error." });
        }

        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content || 'I could not process that request.';
        res.json({ reply: replyText });
    } catch (err) {
        console.error("Chat API error:", err);
        res.status(500).json({ error: "Failed to connect to AI service." });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});