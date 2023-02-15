### node practice

#### 1.start postgresql
``docker run -itd -e POSTGRES_USER=jeremy -e POSTGRES_PASSWORD=123456 -p 5432:5432 -v /data:/var/lib/postgresql/data --name postgresql postgres``
#### 2.start pgadmin
`` docker run --name pgadmin -p 5051:80 -e "PGADMIN_DEFAULT_EMAIL=user@admin.com" -e "PGADMIN_DEFAULT_PASSWORD=123456" -d dpage/pgadmin4``

#### 3.put those two containers run in one network
``docker network create localDB``
<br/>
``docker network connect localDB postgresql``
<br/>
``docker network connect localDB pgadmin``

### 4.create table using the sql file under schema folder


### 5. please sequelize doc https://sequelize.org/docs/v6/