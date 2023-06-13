const express = require('express');
const router = express.Router();

let robotPosition = { x: 0, y: 0 }; // Add a variable to store the robot's position

// GET /api/robots - Retrieve all robots
router.get('/', (req, res) => {
  res.json(robots);
});

// GET /api/robots/:id - Retrieve a specific robot by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const robot = robots.find((robot) => robot.id === parseInt(id));
  if (!robot) {
    return res.status(404).json({ error: 'Robot not found' });
  }
  res.json(robot);
});

// POST /api/robots - Create a new robot
router.post('/', (req, res) => {
  const { name } = req.body;
  const newRobot = { id: robots.length + 1, name };
  robots.push(newRobot);
  res.status(201).json(newRobot);
});

// PUT /api/robots/:id - Update a specific robot by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const robotIndex = robots.findIndex((robot) => robot.id === parseInt(id));
  if (robotIndex === -1) {
    return res.status(404).json({ error: 'Robot not found' });
  }
  const updatedRobot = { id: parseInt(id), name };
  robots[robotIndex] = updatedRobot;
  res.json(updatedRobot);
});

// DELETE /api/robots/:id - Delete a specific robot by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const robotIndex = robots.findIndex((robot) => robot.id === parseInt(id));
  if (robotIndex === -1) {
    return res.status(404).json({ error: 'Robot not found' });
  }
  const deletedRobot = robots.splice(robotIndex, 1)[0];
  res.json(deletedRobot);
});

// POST /api/robots/move - Move the robot
// POST /api/robots/move - Move the robot
router.post('/move', (req, res) => {
  const { direction, x, y } = req.body;
  
  if (x === 0 && y === 0) {
    // Reset the robot's position to (0, 0)
    robotPosition = { x: 0, y: 0 };
  } else {
    // Handle normal movement logic
    if (direction === 'up') {
      robotPosition.y = Math.max(robotPosition.y - 1, 0);
    } else if (direction === 'down') {
      robotPosition.y = Math.min(robotPosition.y + 1, 4);
    } else if (direction === 'left') {
      robotPosition.x = Math.max(robotPosition.x - 1, 0);
    } else if (direction === 'right') {
      robotPosition.x = Math.min(robotPosition.x + 1, 4);
    }
  }
  
  res.json({ position: robotPosition });
});

module.exports = router;


module.exports = router;
