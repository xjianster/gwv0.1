package com.gw.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gw.dao.IUserDao;
import com.gw.domain.UserEntity;
import com.gw.exception.ExistException;
import com.gw.exception.NotExistException;
import com.gw.exception.ParameterException;

@Controller
@RequestMapping("/user")
public class UserController {

	@Resource(name="userDao")
	private IUserDao userDao;

	@RequestMapping("/getAllUser")
	public String getAllUser(HttpServletRequest request){
		
		request.setAttribute("userList", userDao.getAllUser());
		
		return "/index";
	}
	
	@RequestMapping("/getUser")
	public String getUser(String id,HttpServletRequest request){
		
		request.setAttribute("user", userDao.getUserById(Integer.parseInt(id)));
	
		return "/editUser";
	}
	
	@RequestMapping("/toAddUser")
	public String toAddUser(){
		return "/addUser";
	}
	
	@RequestMapping("/addUser")
	public String addUser(UserEntity user,HttpServletRequest request){
		
		try {
			userDao.createUser(user);
			return "redirect:/user/getAllUser";	
		} catch (ExistException e) {
			e.printStackTrace();
		} catch (ParameterException e) {
			e.printStackTrace();
		}
		return "/error";
	}
	
	@RequestMapping("/delUser")
	public void delUser(String id,HttpServletResponse response){
		
		String result = "{\"result\":\"error\"}";
		
		userDao.removeUserById(Integer.parseInt(id));

		result = "{\"result\":\"success\"}";
		
		response.setContentType("application/json");
		
		try {
			PrintWriter out = response.getWriter();
			out.write(result);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/updateUser")
	public String updateUser(UserEntity user,HttpServletRequest request){
		
		try {
			if(userDao.updateUser(user)){
				user = userDao.getUserById(user.getId());
				request.setAttribute("user", user);
				return "redirect:/user/getAllUser";
			}
		} catch (NotExistException e) {
			e.printStackTrace();
		} catch (ParameterException e) {
			e.printStackTrace();
		}
		return "/error";
	}
}