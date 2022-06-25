Automated invoice generation for lazy contractors (like me).

![](https://badges.aleen42.com/src/node.svg)

```
# Install dependencies
npm install

# Copy the "sample.env" to ".env"
cp sample.env .env

# Change the values of ".env"
sudo vim .env

# Generate pdf invoice dated today
npm start

# You can also provide past/future dates
npm start -- 5/25/2022
```