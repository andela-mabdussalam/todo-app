import db from './models';
import app from './app';

const port = process.env.PORT || 3000;

db.sequelize.sync();

app.listen(port, () => console.log(`Listening on port ${port}`))
