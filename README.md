Automated invoice generation for lazy contractors (like me).

![](https://badges.aleen42.com/src/node.svg)

### Demo
This [invoice](https://github.com/mehamasum/invoice-gen/files/8985285/John-Doe_2022_05.pdf) is generated from [this template](https://mehamasum.github.io/invoice-gen/) using [these values](https://github.com/mehamasum/invoice-gen/blob/master/sample.env).

### How to
```
# Install dependencies
npm install

# Copy the "sample.env" to ".env"
cp sample.env .env

# Change the values of ".env"
sudo vim .env

# Generate PDF invoice dated today
npm start

# You can also provide past/future dates
npm start -- 5/25/2022
```
