package com.manthan.bank.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.manthan.bank.domain.enumeration.Gender;

import com.manthan.bank.domain.enumeration.EducationalQualification;

import com.manthan.bank.domain.enumeration.MaritalStatus;

/**
 * A Customer.
 */
@Document(collection = "customer")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("customer_id")
    private Long customerId;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("limit_balance")
    private Long limitBalance;

    @NotNull
    @Field("sex")
    private Gender sex;

    @NotNull
    @Field("education")
    private EducationalQualification education;

    @NotNull
    @Field("marriage")
    private MaritalStatus marriage;

    @NotNull
    @Field("age")
    private Integer age;

    @Field("credit_history")
    private String creditHistory;

    @NotNull
    @Field("is_defaulter")
    private Boolean isDefaulter;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public Customer customerId(Long customerId) {
        this.customerId = customerId;
        return this;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getName() {
        return name;
    }

    public Customer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getLimitBalance() {
        return limitBalance;
    }

    public Customer limitBalance(Long limitBalance) {
        this.limitBalance = limitBalance;
        return this;
    }

    public void setLimitBalance(Long limitBalance) {
        this.limitBalance = limitBalance;
    }

    public Gender getSex() {
        return sex;
    }

    public Customer sex(Gender sex) {
        this.sex = sex;
        return this;
    }

    public void setSex(Gender sex) {
        this.sex = sex;
    }

    public EducationalQualification getEducation() {
        return education;
    }

    public Customer education(EducationalQualification education) {
        this.education = education;
        return this;
    }

    public void setEducation(EducationalQualification education) {
        this.education = education;
    }

    public MaritalStatus getMarriage() {
        return marriage;
    }

    public Customer marriage(MaritalStatus marriage) {
        this.marriage = marriage;
        return this;
    }

    public void setMarriage(MaritalStatus marriage) {
        this.marriage = marriage;
    }

    public Integer getAge() {
        return age;
    }

    public Customer age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getCreditHistory() {
        return creditHistory;
    }

    public Customer creditHistory(String creditHistory) {
        this.creditHistory = creditHistory;
        return this;
    }

    public void setCreditHistory(String creditHistory) {
        this.creditHistory = creditHistory;
    }

    public Boolean isIsDefaulter() {
        return isDefaulter;
    }

    public Customer isDefaulter(Boolean isDefaulter) {
        this.isDefaulter = isDefaulter;
        return this;
    }

    public void setIsDefaulter(Boolean isDefaulter) {
        this.isDefaulter = isDefaulter;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", customerId=" + getCustomerId() +
            ", name='" + getName() + "'" +
            ", limitBalance=" + getLimitBalance() +
            ", sex='" + getSex() + "'" +
            ", education='" + getEducation() + "'" +
            ", marriage='" + getMarriage() + "'" +
            ", age=" + getAge() +
            ", creditHistory='" + getCreditHistory() + "'" +
            ", isDefaulter='" + isIsDefaulter() + "'" +
            "}";
    }
}
