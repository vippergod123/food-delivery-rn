## SETUP ENVIROMENT

1. Create .env file `vi .env` or `nano .env`
2. Create global constant to into .env such as: MONGO_USER, MONGO_PASSWORD, SECRET_KEY, v.v...
3. Add cmd at the end of `.profile` -> `set -o allexport; source /root/.env; set +o allexport` (replace path for env)
4. Reset syste