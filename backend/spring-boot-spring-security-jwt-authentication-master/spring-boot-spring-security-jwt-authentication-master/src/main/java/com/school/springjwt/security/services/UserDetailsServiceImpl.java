package com.school.springjwt.security.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.school.springjwt.models.ERole;
import com.school.springjwt.models.Role;
import com.school.springjwt.models.User;
import com.school.springjwt.payload.request.SignupRequest;
import com.school.springjwt.repository.RoleRepository;
import com.school.springjwt.repository.UserRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  UserRepository userRepository;
  @Autowired
  RoleRepository roleRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

    return UserDetailsImpl.build(user);
  }
  public List<User> findAllUsers(){
	 return userRepository.findAll();
  }
  public void deleteUser(Long id){
	  userRepository.deleteById(id);
  }
  public User updateUser(SignupRequest signUpRequest){
	  User existingUser = userRepository.findById(signUpRequest.getId())
		        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + signUpRequest.getUsername()));
		 existingUser.setEmail(signUpRequest.getEmail());
		 Set<String> strRoles = signUpRequest.getRole();
		    Set<Role> roles = new HashSet<>();

		    if (strRoles == null) {
		      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
		          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		      roles.add(userRole);
		    } else {
		      strRoles.forEach(role -> {
		        switch (role) {
		        case "admin":
		          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
		              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		          roles.add(adminRole);

		          break;
		        case "mod":
		          Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
		              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		          roles.add(modRole);

		          break;
		        default:
		          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
		              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		          roles.add(userRole);
		        }
		      });
		    }

		    existingUser.setRoles(roles);
		    userRepository.save(existingUser);
	  return userRepository.save(existingUser);
	  }
}
