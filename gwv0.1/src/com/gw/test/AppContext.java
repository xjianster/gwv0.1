package com.gw.test;

import java.io.File;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class AppContext {

	private static ApplicationContext ctx;
	static String PATH1 = "./src/spring-ioc.xml";
	static String PATH2 = "./spring-beans.xml";

	public static ApplicationContext getCtx() {
		if (ctx == null) {
			File file = new File(PATH1);
			if(file.exists()){
				ctx = new FileSystemXmlApplicationContext(PATH1);
			}else{
				ctx = new ClassPathXmlApplicationContext(PATH2);
			}
		}
		return ctx;
	}

	public static Object getBean(String beanName) {
		ApplicationContext ctx = AppContext.getCtx();
		return ctx.getBean(beanName);
	}
}
