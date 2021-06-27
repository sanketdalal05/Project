const express = require("express")
let router = express.Router();
const fcontroller = require('../controller/farmcontroller');


/**
 * @swagger
 * /farmer:
 *   get:
 *     responses:
 *       200:
 *         description: "all farmers"
 */
router.get('/', fcontroller.getfarmer);


/**
 * @swagger
 * /farmer:
 *   post:
 *     requestBody:
 *       content:
 *         application/json: 
 *             schema:
 *                type: object
 *     responses:
 *       200:
 *         description: post
 */
   
  router.post("/",fcontroller.createfarmer);

/**
 * @swagger
 * /farmer/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *     description: farmer get by id
 *     responses:
 *        "200":
 *         description: get farmer by id
 */


router.get('/:id', fcontroller.getonefarmer);


/**
 * @swagger
 * /farmer/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     requestBody:
 *       content:
 *         application/json: 
 *             schema:
 *                type: object
 *     responses:
 *       200:
 *         description: get farmer by id
 */
router.patch('/:id', fcontroller.farmpatch);

/**
 * @swagger
 * /farmer/{id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *     requestBody:
 *       content:
 *         application/json: 
 *             schema:
 *                type: object
 *     responses:
 *         200:
 *           description: put farmer by id
 */
router.put('/:id', fcontroller.farmupdate);


/**
 * @swagger
 * /farmer/{id}:
 *   delete:
 *     summary: delete a farmer
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *     responses:
 *        "200":
 *         description: get farmer by id
 */
  router.delete('/:id',fcontroller.farmdelete)

module.exports = router;