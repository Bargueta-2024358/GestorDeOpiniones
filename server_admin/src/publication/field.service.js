import Publication from './publication.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

export const fetchPublications = async ({
  page = 1,
  limit = 10,
  isActive = true,
}) => {
  const filter = { isActive };
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  const publications = await Publication.find(filter)
    .limit(limitNumber * 1)
    .skip((pageNumber - 1) * limitNumber)
    .sort({ createdAt: -1 });

  const total = await Publication.countDocuments(filter);

  return {
    publications,
    pagination:{
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      limit,
    },
  };
};

export const fetchPublicationById= async (id) => {
  return Publication.findById(id);
};

export const createPublicationRecord = async ({ publicationData, file }) => {
  const data = { ...publicationData };

  if (file) {
    const extension = file.path.split('.').pop();
    const filename = file.filename;
    const relativePath = filename.substring(filename.indexOf('publications/'));

    data.photo = `${relativePath}.${extension}`;
  } else {
    data.photo = 'publications/kinal_sports_nyvxo5';
  }

  const publication = new Publication(data);
  await publication.save();
  return publication;
};

export const updatePublicationRecord = async ({ id, updateData, file }) => {
  const data = { ...updateData };

  if (file) {
    const currentPublication = await Publication.findById(id);

    if (currentPublication && currentPublication.photo) {
      const photoPath = currentPublication.photo;
      const photoWithoutExt = photoPath.substring(
        0,
        photoPath.lastIndexOf('.')
      );
      const publicId = `kinal_sports/${photoWithoutExt}`;

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (deleteError) {
        console.error(
          `Error al eliminar imagen anterior de Cloudinary: ${deleteError.message}`
        );
      }
    }

    const extension = file.path.split('.').pop();
    const filename = file.filename;
    const relativePath = filename.includes('fields/')
      ? filename.substring(filename.indexOf('fields/'))
      : filename;
    data.photo = `${relativePath}.${extension}`;
  }

  return Field.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const updateFieldStatus = async ({ id, isActive }) => {
  return Field.findByIdAndUpdate(id, { isActive }, { new: true });
};
