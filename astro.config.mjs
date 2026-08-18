// @ts-check
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      WEBEVENTS_CALENDAR_URL: envField.string({
        context: 'server',
        access: 'secret'
      })
    }
  }
});
