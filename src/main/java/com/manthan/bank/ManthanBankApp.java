package com.manthan.bank;

import com.manthan.bank.config.ApplicationProperties;
import com.manthan.bank.config.DefaultProfileUtil;
import com.manthan.bank.domain.Customer;
import com.manthan.bank.domain.enumeration.EducationalQualification;
import com.manthan.bank.domain.enumeration.Gender;
import com.manthan.bank.domain.enumeration.MaritalStatus;
import com.manthan.bank.repository.CustomerRepository;
import com.opencsv.CSVReader;

import io.github.jhipster.config.JHipsterConstants;
import io.jsonwebtoken.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

import java.io.Reader;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@SpringBootApplication
@EnableConfigurationProperties({ ApplicationProperties.class })
public class ManthanBankApp implements InitializingBean {

    @Autowired
    private CustomerRepository customerRepository;

    private static final Logger log = LoggerFactory.getLogger(ManthanBankApp.class);

    private final Environment env;

    public ManthanBankApp(Environment env) {
        this.env = env;
    }

    /**
     * Initializes ManthanBank.
     * <p>
     * Spring profiles can be configured with a program argument
     * --spring.profiles.active=your-active-profile
     * <p>
     * You can find more information on how profiles work with JHipster on <a href=
     * "https://www.jhipster.tech/profiles/">https://www.jhipster.tech/profiles/</a>.
     */
    @Override
    public void afterPropertiesSet() throws Exception {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT)
                && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_PRODUCTION)) {
            log.error("You have misconfigured your application! It should not run "
                    + "with both the 'dev' and 'prod' profiles at the same time.");
        }
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT)
                && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_CLOUD)) {
            log.error("You have misconfigured your application! It should not "
                    + "run with both the 'dev' and 'cloud' profiles at the same time.");
        }
    }

    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments.
     */
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(ManthanBankApp.class);
        DefaultProfileUtil.addDefaultProfile(app);
        Environment env = app.run(args).getEnvironment();
        logApplicationStartup(env);
    }

    private static final String CSV_FILE_PATH = "./credit_card.csv";

    @Bean
    InitializingBean initDb() {
        return () -> {
            customerRepository.deleteAll();
            Gender[] genders = { Gender.OTHER, Gender.MALE, Gender.FEMALE };
            MaritalStatus[] mStatus = { MaritalStatus.UNKNOWN, MaritalStatus.MARRIED, MaritalStatus.SINGLE,
                    MaritalStatus.OTHERS };
            EducationalQualification[] educationalQualifications = { EducationalQualification.UNKNOWN0,
                    EducationalQualification.GRADUATE_SCHOOL, EducationalQualification.UNIVERSITY,
                    EducationalQualification.HIGH_SCHOOL, EducationalQualification.OTHERS,
                    EducationalQualification.UNKNOWN, EducationalQualification.UNKNOWN2 };

            try (Reader reader = Files.newBufferedReader(Paths.get(CSV_FILE_PATH));
                    CSVReader csvReader = new CSVReader(reader);) {

                List<String[]> records = csvReader.readAll();
                int i = 0;
                for (String[] record : records) {
                    if (i == 0) {
                        i++;
                        continue;
                    }

                    Customer cust = new Customer();
                    cust.setCustomerId(Long.parseLong(record[0]));
                    cust.setName(record[1]);
                    cust.setLimitBalance(Long.parseLong(record[2]));
                    cust.setSex(genders[Integer.parseInt(record[3])]);
                    cust.setEducation(educationalQualifications[Integer.parseInt(record[4])]);
                    cust.setMarriage(mStatus[Integer.parseInt(record[5])]);
                    cust.setAge(Integer.parseInt(record[6]));

                    JSONObject obj = new JSONObject();
                    obj.put("PAY", String.join(",",Arrays.copyOfRange(record, 7, 12)));
                    obj.put("BILL_AMT", String.join(",",Arrays.copyOfRange(record, 13, 18)));
                    obj.put("PAY_AMT", String.join(",",Arrays.copyOfRange(record, 19, 24)));
                    cust.setCreditHistory(obj.toString());

                    Boolean isDefaulter = Integer.parseInt(record[25]) == 1 ? true : false;
                    cust.setIsDefaulter(isDefaulter);

                    //SAVE TO DB
                    customerRepository.save(cust);
                }

                csvReader.close();
            } catch (java.io.IOException | JSONException e) {

            } finally {
            }
        };
    }

    private static void logApplicationStartup(Environment env) {
        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        String serverPort = env.getProperty("server.port");
        String contextPath = env.getProperty("server.servlet.context-path");
        if (StringUtils.isBlank(contextPath)) {
            contextPath = "/";
        }
        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }
        log.info(
                "\n----------------------------------------------------------\n\t"
                        + "Application '{}' is running! Access URLs:\n\t" + "Local: \t\t{}://localhost:{}{}\n\t"
                        + "External: \t{}://{}:{}{}\n\t"
                        + "Profile(s): \t{}\n----------------------------------------------------------",
                env.getProperty("spring.application.name"), protocol, serverPort, contextPath, protocol, hostAddress,
                serverPort, contextPath, env.getActiveProfiles());
    }
}
