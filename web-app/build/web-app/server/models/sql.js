"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabase = (0, supabase_js_1.createClient)(process.env.SUPA_URL, process.env.SUPA_KEY);
function testSupabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Connected to Supabase Database');
            const { data, error } = yield supabase.from('user').select('*');
            if (error)
                throw error;
            console.log(data, '<--- Testing Data from Supabase');
        }
        catch (error) {
            console.error(error, '<--- connection error to Supabase');
        }
    });
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
