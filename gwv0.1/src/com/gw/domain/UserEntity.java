package com.gw.domain;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

//表名称和类名称
@Entity
//@Entity(name = "USER_TABLE")
//@Table(name = "USER_TABLE")
//自动生成主键，从TABLE_GENERATOR中获取下一个主键值
@javax.persistence.TableGenerator(name="user_entity_id",
								  table="TABLE_GENERATOR", 
                                  pkColumnName="GEN_NAME", 
                                  valueColumnName="GEN_VALUE",
                                  pkColumnValue="USER_ENTITY_PK",
                                  allocationSize=1)
@SuppressWarnings("serial")
public class UserEntity implements Serializable{
	private int id;										//用户标识
	private String name;									//用户名
	private String password;								//密码
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE,generator="user_entity_id")
//  @GeneratedValue(strategy=GenerationType.AUTO) 	
	@Column(name = "IID")
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	@Column(name = "NNAME")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "PPASSWORD")
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
