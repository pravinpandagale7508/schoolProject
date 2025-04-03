package com.school.springjwt.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school.springjwt.models.User;
import com.school.springjwt.payload.request.LoginRequest;
import com.school.springjwt.payload.request.SignupRequest;
import com.school.springjwt.security.services.UserDetailsServiceImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	@Autowired
	UserDetailsServiceImpl impl;
	
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public String userAccess() {
    return "User Content.";
  }

  @GetMapping("/mod")
  @PreAuthorize("hasRole('MODERATOR')")
  public String moderatorAccess() {
    return "Moderator Board.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Board.";
  }
  @GetMapping("/admin/getAll")
  @PreAuthorize("hasRole('ADMIN')")
  public List<User> getAll() {
    return impl.findAllUsers();
  }
  @PostMapping("/admin/update")
  @PreAuthorize("hasRole('ADMIN')")
  public User updateUser(@RequestBody SignupRequest user) {
    return impl.updateUser(user);
  }
  @DeleteMapping("/admin/delete/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public String deleteUser(@PathVariable("id") Long id) {
	  try {
		  impl.deleteUser(id);
	} catch (Exception e) {
		 return "del failed";
	}
    return "deleted succesfully";
  }
}
