const express = require("express")
const Ccontroller = require("../controller/cropcontroller")
const router = express.Router();

/**
 * @swagger
 * /crop:
 *   get:
 *     responses:
 *       200:
 *         description: "all farmers"
 */
router.get('/', Ccontroller.getcrops);


/**
 * @swagger
 * /crop:
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

router.post("/", Ccontroller.postcrop);

/**
 * @swagger
 * /crop/{id}:
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

router.get('/:id', Ccontroller.onecrop);


/**
 * @swagger
 * /crop/{id}:
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
router.patch('/:id', Ccontroller.crop_patch);

/**
 * @swagger
 * /crop/{id}:
 *   delete:
 *     summary: delete a crop
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *     responses:
 *         200:
 *           description: get delete by id
 */
router.delete('/:id', Ccontroller.crop_delete);

// router.get('/', (req, res) => {
//     res.send('Hello crop here');
//   })

module.exports = router;