package com.manthan.bank.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.manthan.bank.domain.enumeration.Gender;
import com.manthan.bank.domain.enumeration.EducationalQualification;
import com.manthan.bank.domain.enumeration.MaritalStatus;

/**
 * A DTO for the {@link com.manthan.bank.domain.Customer} entity.
 */
public class CustomerDTO implements Serializable {

    private String id;

    @NotNull
    private Long customerId;

    @NotNull
    private String name;

    @NotNull
    private Long limitBalance;

    @NotNull
    private Gender sex;

    @NotNull
    private EducationalQualification education;

    @NotNull
    private MaritalStatus marriage;

    @NotNull
    private Integer age;

    private String creditHistory;

    @NotNull
    private Boolean isDefaulter;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getLimitBalance() {
        return limitBalance;
    }

    public void setLimitBalance(Long limitBalance) {
        this.limitBalance = limitBalance;
    }

    public Gender getSex() {
        return sex;
    }

    public void setSex(Gender sex) {
        this.sex = sex;
    }

    public EducationalQualification getEducation() {
        return education;
    }

    public void setEducation(EducationalQualification education) {
        this.education = education;
    }

    public MaritalStatus getMarriage() {
        return marriage;
    }

    public void setMarriage(MaritalStatus marriage) {
        this.marriage = marriage;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getCreditHistory() {
        return creditHistory;
    }

    public void setCreditHistory(String creditHistory) {
        this.creditHistory = creditHistory;
    }

    public Boolean isIsDefaulter() {
        return isDefaulter;
    }

    public void setIsDefaulter(Boolean isDefaulter) {
        this.isDefaulter = isDefaulter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerDTO customerDTO = (CustomerDTO) o;
        if (customerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerDTO{" +
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
