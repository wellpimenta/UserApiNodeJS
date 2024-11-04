const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Criar usuário
exports.createUser = async (req, res) => {
  const { cpf, nome, dataNascimento, endereco, criadoPor } = req.body;

  try {
    const novoUsuario = await User.create({
      cpf,
      nome,
      dataNascimento,
      endereco,
      criadoPor,
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login (autenticação)
exports.login = async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const user = await User.findOne({ where: { cpf } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) return res.status(400).json({ message: 'Senha inválida' });

    const token = jwt.sign({ id: user.id, nome: user.nome }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, endereco, atualizadoPor } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    await user.update({ nome, endereco, atualizadoPor, atualizadoEm: new Date() });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remover usuário (Soft delete)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const { removidoPor } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    await user.update({ status: 'Removido', removidoEm: new Date(), removidoPor });
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
