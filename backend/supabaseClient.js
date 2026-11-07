const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const DB_FILE = path.join(__dirname, 'db.json');

// Initialize DB with seed data if it doesn't exist
function initDb() {
  if (!fs.existsSync(DB_FILE)) {
    const seed = {
      users: [
        {
          id: 'donor_hyatt',
          name: 'Grand Royal Banquet Hall',
          email: 'banquet@grandroyal.com',
          phone: '+91 98765 43210',
          address: 'Venkateshwara Hills Road, Hyderabad',
          role: 'donor',
          donor_type: 'hotel',
          points: 1250,
          badges: ['Golden Heart', 'Surplus Slayer', 'Buffet Hero'],
          created_at: new Date().toISOString()
        },
        {
          id: 'donor_annapurna',
          name: 'Annapurna Catering Services',
          email: 'contact@annacaters.co.in',
          phone: '+91 87654 32109',
          address: 'Sankey Road, Sadashivanagar, Bengaluru',
          role: 'donor',
          donor_type: 'caterer',
          points: 840,
          badges: ['Zero Waste Champ', 'Wedding Saviour'],
          created_at: new Date().toISOString()
        },
        {
          id: 'ngo_rotifoundation',
          name: 'Roti Seva Foundation',
          email: 'hope@rotiseva.org',
          phone: '+91 99887 76655',
          address: 'Gachibowli Ring Road Outer Corridor, Hyderabad',
          role: 'ngo',
          ngo_reg_id: 'NGO-HYD-55428-A',
          is_verified: true,
          points: 2100,
          badges: ['Super Distributor', 'Midnight Angels', 'Verified Ally'],
          created_at: new Date().toISOString()
        },
        {
          id: 'ngo_feedinghands',
          name: 'Feeding Hands Mission',
          email: 'connect@feedinghands.org',
          phone: '+91 88990 11223',
          address: 'Anna Nagar West Block, Chennai',
          role: 'ngo',
          ngo_reg_id: 'NGO-TN-90112-B',
          is_verified: false,
          points: 420,
          badges: ['Quick Responder'],
          created_at: new Date().toISOString()
        },
        {
          id: 'admin_god',
          name: 'FoodBridge Global Admin',
          email: 'admin@foodbridge.org',
          phone: '+91 90000 00001',
          address: 'HQ Command Desk, New Delhi',
          role: 'admin',
          points: 9999,
          badges: ['Pioneer Defender'],
          created_at: new Date().toISOString()
        }
      ],
      food_donations: [
        {
          id: 'donation_1',
          donor_id: 'donor_hyatt',
          donor_name: 'Grand Royal Banquet Hall',
          food_name: 'Buffet Feast: Jeera Rice, Paneer Butter Masala, Roti',
          category: 'cooked',
          quantity: '45 Servings',
          expiry_time: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
          location: 'Venkateshwara Hills Road, Hyderabad',
          latitude: 17.4126,
          longitude: 78.4482,
          description: 'Fully packed in insulated carriers. Packed at 9:30 AM. Keep hot.',
          status: 'available',
          image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
          created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'donation_2',
          donor_id: 'donor_annapurna',
          donor_name: 'Annapurna Catering',
          food_name: 'Fresh Wedding surplus Vegetable Biryani & Raita',
          category: 'cooked',
          quantity: '120 Servings',
          expiry_time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
          location: 'Sankey Road, Sadashivanagar, Bengaluru',
          latitude: 13.0034,
          longitude: 77.5796,
          description: 'Stored in premium food-grade aluminum buckets. High nutritional rating.',
          status: 'claimed',
          image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          assigned_ngo_id: 'ngo_rotifoundation',
          assigned_ngo_name: 'Roti Seva Foundation',
          pickup_time: '14:30'
        }
      ],
      pickup_requests: [],
      notifications: [
        {
          id: 'notif_1',
          user_id: 'ngo_rotifoundation',
          message: 'Urgent Cargo Nearby: Urgent: 120 servings of fresh wedding biryani posted nearby in Sankey Road!',
          created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString()
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2));
  }
}

class QueryBuilder {
  constructor(table) {
    this.table = table;
    this.filters = [];
    this.isSingle = false;
    this.isDelete = false;
    this.updateData = null;
    this.insertData = null;
    this.orderCol = null;
    this.orderAsc = true;
  }

  select(fields = '*') {
    return this;
  }

  insert(data) {
    this.insertData = data;
    return this;
  }

  update(data) {
    this.updateData = data;
    return this;
  }

  delete() {
    this.isDelete = true;
    return this;
  }

  eq(col, val) {
    this.filters.push({ col, val });
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  order(col, { ascending = true } = {}) {
    this.orderCol = col;
    this.orderAsc = ascending;
    return this;
  }

  async execute() {
    initDb();
    let db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    let list = db[this.table] || [];

    // Perform Insert
    if (this.insertData) {
      const newRows = Array.isArray(this.insertData) ? this.insertData : [this.insertData];
      const inserted = newRows.map(row => {
        const newRow = { 
          id: row.id || `${this.table.slice(0, -1)}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
          created_at: new Date().toISOString(),
          ...row 
        };
        list.push(newRow);
        return newRow;
      });
      db[this.table] = list;
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
      return { data: Array.isArray(this.insertData) ? inserted : inserted[0], error: null };
    }

    // Filter list
    let filtered = [...list];
    for (const f of this.filters) {
      filtered = filtered.filter(item => item[f.col] == f.val);
    }

    // Perform Delete
    if (this.isDelete) {
      db[this.table] = list.filter(item => !filtered.includes(item));
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
      return { data: filtered, error: null };
    }

    // Perform Update
    if (this.updateData) {
      const updated = filtered.map(item => {
        Object.assign(item, this.updateData);
        return item;
      });
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
      return { data: updated, error: null };
    }

    // Sort order
    if (this.orderCol) {
      filtered.sort((a, b) => {
        const valA = a[this.orderCol];
        const valB = b[this.orderCol];
        if (valA < valB) return this.orderAsc ? -1 : 1;
        if (valA > valB) return this.orderAsc ? 1 : -1;
        return 0;
      });
    }

    let result = filtered;
    if (this.isSingle) {
      result = filtered.length > 0 ? filtered[0] : null;
      if (!result) {
        return { data: null, error: { code: "PGRST116", message: "JSON object requested, multiple (or no) rows returned", details: "The response contains 0 rows", hint: null } };
      }
    }

    return { data: result, error: null };
  }

  then(onFulfilled, onRejected) {
    return this.execute().then(onFulfilled, onRejected);
  }
}

let useLocalDb = false;
let supabase = null;

try {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
  );
} catch (e) {
  console.log("Supabase initialization failed, falling back to local DB.");
  useLocalDb = true;
}

module.exports = {
  from(table) {
    if (useLocalDb || !supabase) {
      return new QueryBuilder(table);
    }
    
    // Create a proxy builder that tries real client, then falls back on error
    const realBuilder = supabase.from(table);
    
    // We construct a wrapper that has all the builder methods
    const wrapper = {
      _calls: [],
      select(...args) {
        this._calls.push({ name: 'select', args });
        return this;
      },
      insert(...args) {
        this._calls.push({ name: 'insert', args });
        return this;
      },
      update(...args) {
        this._calls.push({ name: 'update', args });
        return this;
      },
      delete(...args) {
        this._calls.push({ name: 'delete', args });
        return this;
      },
      eq(...args) {
        this._calls.push({ name: 'eq', args });
        return this;
      },
      single(...args) {
        this._calls.push({ name: 'single', args });
        return this;
      },
      order(...args) {
        this._calls.push({ name: 'order', args });
        return this;
      },
      async then(onFulfilled, onRejected) {
        try {
          if (useLocalDb) {
            throw new Error("Local DB forced");
          }
          // Build the chain on real client
          let chain = realBuilder;
          for (const call of this._calls) {
            chain = chain[call.name](...call.args);
          }
          const res = await chain;
          if (res.error && (res.error.message?.includes('fetch failed') || res.error.message?.includes('getaddrinfo'))) {
            throw res.error;
          }
          return onFulfilled ? onFulfilled(res) : res;
        } catch (err) {
          console.warn("⚠️ Supabase operation failed, switching to local DB fallback:", err.message || err);
          useLocalDb = true;
          // Re-execute on local QueryBuilder
          let localBuilder = new QueryBuilder(table);
          for (const call of this._calls) {
            localBuilder = localBuilder[call.name](...call.args);
          }
          const res = await localBuilder;
          return onFulfilled ? onFulfilled(res) : res;
        }
      }
    };
    
    return wrapper;
  }
};