const ContentModel = require('../models/content.model');
const puppeteer = require('puppeteer');
let count =0

exports.createContent = async (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    for (let url of req.body.channelURL) {
        await scrapeChannel(url)
    }
    res.status(200).send({"count": count});
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 20;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            console.log(req.query.page)
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ContentModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.findByType = (req,res) => {
    console.log(req.params.typeContent)
    ContentModel.findByType(req.params.typeContent)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.findByName = (req,res) => {
    console.log("hreeeeee")
    ContentModel.findByName(req.params.key)
        .then((result) => {
            res.status(200).send(result);
        });
};

async function scrapeChannel(url) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url ,{waitUntil:'domcontentloaded',timeout:'60000'});

    const res = await page.$$eval('img', imgs => imgs.map(e1 => e1.src))

    await browser.close();

    res.map(e2 => {
        if (e2.startsWith("http") || e2.startsWith("www"))
        {
            var jsonData = {};
            jsonData["name"] = url;
            jsonData["typeContent"] = "image";
            jsonData["contentUrl"] = e2;
            count++;
            ContentModel.createContent(jsonData)
        }
    })
}