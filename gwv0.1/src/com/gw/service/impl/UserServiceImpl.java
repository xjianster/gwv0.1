package com.gw.service.impl;

import org.apache.log4j.Logger;

import com.gw.dao.IUserDao;
import com.gw.service.IUserService;

public class UserServiceImpl implements IUserService {

	private static final Logger logger = Logger.getLogger("com.gw.service.user");

	private IUserDao userDao;
	
	public void setUserDao(IUserDao userDao) {
		this.userDao = userDao;
	}
}
