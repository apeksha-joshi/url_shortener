const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const ejs = require("ejs");
const shortid = require("shortid");
var plates = require('plates');
//const request = require("request");
let uu = require('url-unshort')();
const bodyParser = require("body-parser");
const errorUrl='http://localhost/error';



module.exports = app => {
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.set('views', './views');
//app.set('view engine', 'ejs');

  app.post("/short", async (req, res) => {
    const { orgUrl, sbUrl } = req.body;
    console.log(req.body);
    const  originalUrl = req.body.originalUrl
    const shortBaseUrl  = req.body.shortBaseUrl;
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res
        .status(401)
        .json(
          "Invalid Base Url"
        );
    }
    const urlCode = shortid.generate();
    const updatedAt = new Date();
    if (validUrl.isUri(originalUrl)) {
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });
        if (item) {
         console.log("Original URL: ",item.originalUrl)
         console.log("Short URL: ",item.shortUrl)
          res.json({original:item.originalUrl,shortUrl:item.shortUrl})
        } else {
          shortUrl = shortBaseUrl + "/" + urlCode;
          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
          });
          await item.save();
          res.status(200);
        }
      } catch (err) {
        res.status(401).json("Invalid User Id");
      }
    } else {
      return res
        .status(401)
        .json(
          "Invalid Original Url"
        );
    }
  });
};