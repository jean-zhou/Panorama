const path = require('path');
const fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/test', function (req, res, next) {
    res.send('test ---- ');
});
// /cscloud-zone-date/topic/reception_flow?dataType=capacityPackage&contentType=content&id=p_bbb4fff8a812ff47ef9f6123d96bfebd
router.get('/reception_flow', (req, res, next) => {
    let dataType = req.query.dataType
    let contentType = req.query.contentType
    let id = req.query.id
    console.log('dataType', dataType)
    console.log('contentType', contentType)
    console.log('id', id)

    var file = path.join(__dirname, '../data/capacity_package.json');
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err) {
            res.send({
                'status': 1,
                "message": "读取文件失败"
            })
        } else {
            res.send(data)
        }

    })

})

module.exports = router;
