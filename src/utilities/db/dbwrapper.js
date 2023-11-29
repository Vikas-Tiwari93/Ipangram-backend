import * as db_calls from "./dblayer.js";

export const createSingleRecord = async (model, payload) => {
  return await db_calls.createSingleRecord(model, payload);
};

export const createMultipleRecord = async (model, payload) => {
  return await db_calls.createMultipleRecord(model, payload);
};

export const getRecordDetails = async (model, query) => {
  return await db_calls.getRecordDetails(model, query);
};

export const getRecordById = async (model, query) => {
  return await db_calls.getRecordById(model, query);
};

export const updateRecord = async (model, query, payload) => {
  return await db_calls.updateRecord(model, query, payload);
};

export const getRecords = async (model, query) => {
  return await db_calls.getRecords(model, query);
};

export const getAggreateRecords = async (model, query) => {
  return await db_calls.aggreateRecord(model, query);
};

export const deleteRecord = async (model, query) => {
  return await db_calls.deleteRecord(model, query);
};
