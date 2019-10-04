const express = require("express");

const Projects = require("./projectModel");

const router = express.Router();

router.use(validateProjectId);

router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then(projects => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ message: `${id} not found` });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Project not found" });
    });
});

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      //log error to server
      console.log(error);
      res.status(500).json({
        message: "Error creating the project"
      });
    });
});

router.put("/:id", (req, res) => {
  Projects.update(req.params.id, req.params.changes)
    .then(project => {
      if (!req.params.id) {
        res.status(400).json({ message: "missing project id" });
      } else if (!req.params.changes) {
        res.status(400).json({ message: "null" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ message: `missing require fields to make changes` });
    });
});

router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id).then(projects => {
    if (projects > 0) {
      res.status(200).json({ message: `${id} projects have been deleted` });
    } else {
      res.status(404).json({ message: `projecs were not able to be deleted` });
    }
  });
  res.status(200).json(project);
  res.status(500).json({ message: "Project not found" });
});

router.get("/:projectId/actions", (req, res) => {
  Projects.getProjectActions(req.params.projectId)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({
        message: `"Error finding action ${req.params.projectId}`
      });
    });
});

// custome Middleware

function validateProjectId(req, res, next) {
  Projects.get(req.params.projectId)
    .then(project => {

      if (project) {
        req.project = project
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: `your project id isn't valid` });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `missing required action field` });
    });
  next();
}

module.exports = router;
