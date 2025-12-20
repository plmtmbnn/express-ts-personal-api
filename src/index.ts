import app from './app';
import { ENV_GLOBAL } from './config';

const PORT = ENV_GLOBAL.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
