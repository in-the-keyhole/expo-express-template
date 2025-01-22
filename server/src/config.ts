/**
 * Copyright © 2024-2025 Boardman Enterprises, LLC
 * All rights reserved.
 */

import dotenv from 'dotenv';

dotenv.config()

const {
    LOCAL_SSL,
    NODE_ENV,
    PORT,
    CLIENT_HOST,
} = process.env;

const config = {
  localSsl: LOCAL_SSL,
  nodeEnv: NODE_ENV,
  nodePort: PORT,
  clientHost: CLIENT_HOST?.split(','),
}

export default config;
