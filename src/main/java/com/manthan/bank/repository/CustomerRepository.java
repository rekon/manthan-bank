package com.manthan.bank.repository;

import java.util.List;
import java.util.Optional;

import com.manthan.bank.domain.Customer;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> {
    Page<Customer> findByIsDefaulter(Pageable pageable, boolean isDefaulter);
}
