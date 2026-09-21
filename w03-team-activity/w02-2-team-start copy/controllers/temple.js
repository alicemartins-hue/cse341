const db = require('../models');
const Temple = db.temples;

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.create = async (req, res) => {
  try {
    const temple = new Temple({
      temple_id: req.body.temple_id,
      name: req.body.name,
      dedicated: req.body.dedicated,
      location: req.body.location,
      additionalInfo: req.body.additionalInfo,
    });

    const data = await temple.save();

    res.status(201).send(data);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Invalid temple data.',
        errors: err.errors,
      });
    }

    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Temple.',
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    if (req.header('apiKey') !== apiKey) {
      return res.status(401).send({
        message: 'Invalid apiKey, please read the documentation.',
      });
    }

    const data = await Temple.find(
      {},
      {
        temple_id: 1,
        name: 1,
        location: 1,
        dedicated: 1,
        additionalInfo: 1,
        _id: 0,
      }
    );

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while retrieving temples.',
    });
  }
};

exports.findOne = async (req, res) => {
  const temple_id = req.params.temple_id;

  try {
    if (req.header('apiKey') !== apiKey) {
      return res.status(401).send({
        message: 'Invalid apiKey, please read the documentation.',
      });
    }

    const temple = await Temple.findOne({ temple_id: temple_id });

    if (!temple) {
      return res.status(404).send({
        message: `Temple with temple_id=${temple_id} was not found.`,
      });
    }

    res.status(200).send(temple);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving Temple with temple_id=${temple_id}`,
    });
  }
};


exports.update = async (req, res) => {
  const temple_id = req.params.temple_id;

  try {
    if (req.header('apiKey') !== apiKey) {
      return res.status(401).send({
        message: 'Invalid apiKey, please read the documentation.',
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: 'Data to update can not be empty!',
      });
    }

    const temple = await Temple.findOneAndUpdate(
      { temple_id: temple_id },
      {
        name: req.body.name,
        location: req.body.location,
        dedicated: req.body.dedicated,
        additionalInfo: req.body.additionalInfo,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!temple) {
      return res.status(404).send({
        message: `Temple with temple_id=${temple_id} was not found.`,
      });
    }

    res.status(200).send(temple);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Invalid temple data.',
        errors: err.errors,
      });
    }

    res.status(500).send({
      message: `Error updating Temple with temple_id=${temple_id}`,
    });
  }
};

// // Update a Temple by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: 'Data to update can not be empty!',
//     });
//   }

//   const id = req.params.id;

//   Temple.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Temple with id=${id}. Maybe Temple was not found!`,
//         });
//       } else res.send({ message: 'Temple was updated successfully.' });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error updating Temple with id=' + id,
//       });
//     });
// };

exports.delete = async (req, res) => {
  const temple_id = req.params.temple_id;

  try {
    if (req.header('apiKey') !== apiKey) {
      return res.status(401).send({
        message: 'Invalid apiKey, please read the documentation.',
      });
    }

    const temple = await Temple.findOneAndDelete({
      temple_id: temple_id,
    });

    if (!temple) {
      return res.status(404).send({
        message: `Temple with temple_id=${temple_id} was not found.`,
      });
    }

    res.status(200).send({
      message: 'Temple was deleted successfully.',
      temple: temple,
    });
  } catch (err) {
    res.status(500).send({
      message: `Error deleting Temple with temple_id=${temple_id}`,
    });
  }
};

// // Delete a Temple with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Temple.findByIdAndRemove(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Temple with id=${id}. Maybe Temple was not found!`,
//         });
//       } else {
//         res.send({
//           message: 'Temple was deleted successfully!',
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Could not delete Temple with id=' + id,
//       });
//     });
// };

// // Delete all Temples from the database.
// exports.deleteAll = (req, res) => {
//   Temple.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Temples were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while removing all temple.',
//       });
//     });
// };

// // Find all published Temples
// exports.findAllPublished = (req, res) => {
//   Temple.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving temple.',
//       });
//     });
// };
