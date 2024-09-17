import { createClient } from '@supabase/supabase-js'
import { Database } from '../../database.types'
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient<Database>(
  process.env.SUPA_URL,
  process.env.SUPA_KEY
);

async function testSupabase() {
    try {
        console.log('Connected to Supabase Database');
        const { data, error } = await supabase.from('user').select('*');
        console.log('Testing!');

        if( error ) throw error;
        console.log( data, '<--- Testing Data from Supabase');
    } catch(error) {
        console.error(error, '<--- connection error to Supabase');
    }
}

testSupabase();


module.exports = supabase;