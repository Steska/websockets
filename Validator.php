<?php

Class Validator
{
    public $data;
    
    public function __construct(array $data)
    {
        $this->data = $data;
    }
    
    public function validate()
    {
        if (empty($this->data['id']) or !is_numeric($this->data['id'])){
            return false;
        }
        
        if (empty($this->data['name'])){
            return false;
        }
        
        return true;
    }
}