const { nanoid } = require("nanoid");
const notes = require("./notes");

//function menambahkan notes
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  //untuk mendapatkan id unik berupa string
  const id = nanoid(16);

  //waktuMembuat
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updateAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan Berhasil Ditambahkan",
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan Gagal Ditambahkan",
  });
  response.code(500);
  return response;
};

// Menampilkan nilai notes(menampilkan catatan)
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

//Menampilkan Catatan secara spesifik dengan parameter Id
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  //mendapatkan nilai id
  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Catatan Tidak Ditemukan",
  });
  response.code(404);
  return response;
};

//Function untuk edit notes dengan parameter Id
const editNodeByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  //Mencari index array dengan parameter id
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };
    const response = h.response({
      status: "success",
      message: "Catatan berhasil di ubah",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan Gagal Di Update",
  });
  response.code(404);
  return response;
};

// Menghapus notes dengan parameter id
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  //Mencari nilai id
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan Berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan Tidak Berhasil Dihapus",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNodeByIdHandler,
  deleteNoteByIdHandler,
};
