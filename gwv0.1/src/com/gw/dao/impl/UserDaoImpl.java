package com.gw.dao.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.SessionFactory;

import com.gw.dao.IUserDao;
import com.gw.domain.UserEntity;
import com.gw.exception.ExistException;
import com.gw.exception.NotExistException;
import com.gw.exception.ParameterException;

public class UserDaoImpl implements IUserDao {

	private static final Logger logger = Logger.getLogger("com.gw.dao.user");
	
	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	/**************************************************************************************************************
	 * 第一部分：创建UserEntity
	 * ********************************************************
	 * *
	 * @throws ParameterException ***************************************************
	 */
	@Override
	public int createUser(UserEntity user) throws ExistException, ParameterException {
		// TODO Auto-generated method stub
		logger.debug("JDBCDaoImpl::createUser--------------------------->begin ");
		if (user == null 
				|| user.getName() == null || user.getName().trim().length() < 1
				|| user.getPassword() == null	|| user.getPassword().trim().length() < 1){
			logger.error("Bad parameters, createUser failed.");
			throw new ParameterException("Bad parameters, createAccount failed.");
		}
		sessionFactory.getCurrentSession().save(user);
		logger.debug("JDBCDaoImpl::createUser--------------------------->end ");
		return user.getId();
	}

	@Override
	public UserEntity getUserById(int id) {
		// TODO Auto-generated method stub
		logger.debug("JDBCDaoImpl::getUserById--------------------------->begin ");
		logger.debug("id = " + id);
		String hql = "from UserEntity u where u.id=?";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		List<UserEntity> list=query.setInteger(0, id).list();

		UserEntity user=null;
		if (!list.isEmpty()) {
			user=list.get(0);
		}
		logger.debug("JDBCDaoImpl::getUserById--------------------------->end ");
		return user;
	}

	@Override
	public void removeUserById(int id) {
		// TODO Auto-generated method stub
		logger.debug("JDBCDaoImpl::removeUserById--------------------------->begin ");
		logger.debug("id = " + id);
		String hql = "delete UserEntity u where u.id = ?";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setInteger(0, id);
		query.executeUpdate();
		logger.debug("JDBCDaoImpl::removeUserById--------------------------->end ");
	}

	@Override
	public List<UserEntity> getAllUser() {
		// TODO Auto-generated method stub
		logger.debug("JDBCDaoImpl::getAllUser--------------------------->begin ");
		String hql = "from UserEntity";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		
		List<UserEntity> userList=query.list();
		logger.debug("JDBCDaoImpl::getAllUser--------------------------->end ");
		return userList;
	}

	@Override
	public boolean updateUser(UserEntity user) throws ParameterException, NotExistException{
		// TODO Auto-generated method stub
		logger.debug("JDBCDaoImpl::updateUser--------------------------->end ");
		if (user == null
				|| user.getId() < 0
				|| user.getName() == null || user.getName().trim().length() < 1
				|| user.getPassword() == null	|| user.getPassword().trim().length() < 1){
			logger.error("Bad parameters, updateUser failed.");
			throw new ParameterException("Bad parameters, updateUser failed.");
		}
		UserEntity userOld=getUserById(user.getId());
		if(userOld==null){
			logger.error("User not exist, updateAccount failed.");
			throw new NotExistException("User not exist, updateAccount failed.");
		}
		userOld.setName(user.getName());
		userOld.setPassword(user.getPassword());
		sessionFactory.getCurrentSession().merge(userOld);
		logger.debug("JDBCDaoImpl::updateUser--------------------------->end ");
		return false;
	}
}
