package com.Verity.Domain;


import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.server.servlet.ConfigurableServletWebServerFactory;
import org.springframework.stereotype.Component;

/**
 * @author : Eugene
 * @version : 1.0
 * @license :  Internation Business Solution (<a href="https://www.ibs.com">IBS</a>)
 * @mailto : eugene_ong@yahoo.com
 * @created : 28/04/2026
 * @description
 **/

@Component
public class ServerSetting implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {
    @Override
    public void customize(ConfigurableServletWebServerFactory factory) {
        factory.setPort(8081);
    }
}
