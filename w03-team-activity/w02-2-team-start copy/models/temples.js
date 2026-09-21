module.exports = (mongoose) => {
  const Temple = mongoose.model(
    'temples',
    mongoose.Schema(
      {
        temple_id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        dedicated: {
          type: String,
          required: true,
        },
        additionalInfo: {
          type: Boolean,
          required: true,
        },
      },
      { timestamps: true }
    )
  );

  return Temple;
};