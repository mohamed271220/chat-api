import MediaSharing from "../../models/media/media.model";

export const findOrCreateMedia = async (senderId: string, media: string)  => {
  if (!media) {
    return null;
  }

  const existingMedia = await MediaSharing.findOne({ url: media });
  if (existingMedia) {
    return existingMedia._id;
  }

  const newMedia = await MediaSharing.create({
    user: senderId,
    url: media,
  });

  return newMedia._id;
};
