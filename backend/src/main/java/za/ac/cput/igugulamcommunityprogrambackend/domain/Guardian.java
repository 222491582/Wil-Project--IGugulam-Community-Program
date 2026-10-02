package za.ac.cput.igugulamcommunityprogrambackend.domain;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("GUARDIAN")
@PrimaryKeyJoinColumn(name = "user_id")
public class Guardian extends User {

    @Column(nullable = false)
    private String relationshipToStudent;

    private String address;

    public Guardian() {}

    public Guardian(Builder b) {
        super(new User.Builder()
                .setId(b.id)
                .setUsername(b.username)
                .setPassword(b.password)
                .setEmail(b.email)
                .setFullName(b.fullName)
                .setPhone(b.phone)
                .setRole(Role.GUARDIAN)
                .setStatus(b.status));
        this.relationshipToStudent = b.relationshipToStudent;
        this.address = b.address;
    }

    public String getRelationshipToStudent() { return relationshipToStudent; }
    public void setRelationshipToStudent(String r) { this.relationshipToStudent = r; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public static class Builder {
        private Long id;
        private String username;
        private String password;
        private String email;
        private String fullName;
        private String phone;
        private Status status = Status.ACTIVE;
        private String relationshipToStudent;
        private String address;

        public Builder setId(Long id) { this.id = id; return this; }
        public Builder setUsername(String username) { this.username = username; return this; }
        public Builder setPassword(String password) { this.password = password; return this; }
        public Builder setEmail(String email) { this.email = email; return this; }
        public Builder setFullName(String fullName) { this.fullName = fullName; return this; }
        public Builder setPhone(String phone) { this.phone = phone; return this; }
        public Builder setStatus(Status status) { this.status = status; return this; }
        public Builder setRelationshipToStudent(String r) { this.relationshipToStudent = r; return this; }
        public Builder setAddress(String address) { this.address = address; return this; }

        public Guardian build() { return new Guardian(this); }
    }

    @Override
    public String toString() {
        return "Guardian{" + super.toString() +
                ", relationshipToStudent='" + relationshipToStudent + '\'' +
                ", address='" + address + '\'' + '}';
    }
}