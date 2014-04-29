package com.gw.dao;

import java.util.List;

import com.gw.domain.UserEntity;
import com.gw.exception.ExistException;
import com.gw.exception.NotExistException;
import com.gw.exception.ParameterException;

/**
 * 提供与UserEntity相关的持久层操作，读写数据库
 * @author xuj
 *
 */
public interface IUserDao {
	/*********************************************************************
	 * UserEntity 
	 * @throws ParameterException 
	 *********************************************************************/
	public int createUser(UserEntity user)  throws ExistException, ParameterException;
	
	public UserEntity getUserById(int id);
		
	public void removeUserById(int id);
		
	public List<UserEntity> getAllUser();
	
	public boolean updateUser(UserEntity user) throws NotExistException, ParameterException;
	
}
