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

        if( error ) throw error;
        console.log( data, '<--- Testing Data from Supabase');
    } catch(error) {
        console.error(error, '<--- connection error to Supabase');
    }
}

testSupabase();


module.exports = supabase;
// export default supabase;

/** TEST 0 */
// const { createClient } = require('@supabase/supabase-js') as typeof import('@supabase/supabase-js');
// require('dotenv').config();
// const { Database } = require ('../../database.types');

// const supabase = createClient<Database>(
//   process.env.SUPA_URL,
//   process.env.SUPA_KEY
// );

// module.exports = supabase;
/** END of TEST 0 */

/** TEST 1 */
// // Import types using TypeScript syntax (only for type-checking)
// import { createClient } from '@supabase/supabase-js'; // TypeScript type import
// import { Database } from '../../database.types'; // Your custom types

// // Use require for runtime imports (CommonJS)
// const supabaseJs = require('@supabase/supabase-js');
// const dotenv = require('dotenv');

// dotenv.config();

// // Cast the createClient function from the imported module to the correct type
// const supabase = (supabaseJs.createClient as typeof createClient)<Database>(
//   process.env.SUPA_URL!,
//   process.env.SUPA_KEY!
// );

// module.exports = supabase;
/** END of TEST 1 */