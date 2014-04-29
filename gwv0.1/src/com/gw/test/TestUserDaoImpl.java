package com.gw.test;

import org.apache.log4j.Logger;

import com.gw.dao.IUserDao;
import com.gw.domain.UserEntity;
import com.gw.exception.ExistException;
import com.gw.exception.ParameterException;


public class TestUserDaoImpl{

	private static IUserDao userDao;
	private static final Logger logger = Logger.getLogger("com.gw");
	
	protected void setUp() throws Exception {
		userDao = (IUserDao) AppContext.getBean("userDao");
	}

	public static void main(String[] args) throws ExistException, ParameterException {
		// TODO Auto-generated method stub
//		org.omg.CORBA.Object obj = CorbaServiceLocator.getInstance().getObject("127.0.0.1", "1050", "");
        long time = System.currentTimeMillis();
        IUserDao userDao = (IUserDao) AppContext.getBean("userDao");
        System.out.println("use time = " +(System.currentTimeMillis() - time));		
		System.out.println("userDao"+ userDao);
		UserEntity user=new UserEntity();
		user.setName("firstuser");
		user.setPassword("gwfirst");
		System.out.println(userDao.createUser(user));
		System.out.println(userDao.getAllUser().size());
        System.out.println("use time = " +(System.currentTimeMillis() - time));		
	}



}
