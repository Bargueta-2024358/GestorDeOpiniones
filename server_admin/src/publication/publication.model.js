'use strict';

import { Schema, model } from 'mongoose';

const publicationSchema = new Schema(
  {
    pbTitle: {
      type: String,
      required: [true, 'El titulo es requerido'],
      trim: true,
      maxLength: [100, 'El titulo no puede exceder 100 caracteres'],
    },
    pbCategory: {
      type: String,
      required: [true, 'La categoria es requerida'],
      enum: {
        values: ['SOCIAL', 'JUEGOS', 'POLITICO', 'EDUCATIVO'],
        message: 'Tipo de categoria no válida',
      },
    },
    pbContent: {
      type: String,
      required: [true, 'Ingrese texto'],
      trim: true,
      maxLength: [10000, 'Has llegado al maximo de caracteres'],
    },
    pbAutorId: {
      type: String,
      required: [true, 'Ingrese El Id del Autor'],
      trim: true,
      maxLength: [500, 'La id de Autor no puede exceder 100 caracteres'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Índices para optimizar búsquedas
fieldSchema.index({ isActive: 1 });
fieldSchema.index({ fieldType: 1 });
fieldSchema.index({ isActive: 1, fieldType: 1 });

export default model('Field', fieldSchema);
