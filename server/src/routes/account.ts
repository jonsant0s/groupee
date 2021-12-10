import { Router } from "express";
import { login, signup } from "../controllers/account";

const express = require('express');
const router = Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

router.route('/signup').post(signup);

router.route('/login').post(login);

export default router;