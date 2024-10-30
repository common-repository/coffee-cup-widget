<?php
/*
Plugin Name: Coffee Cup Widget
Plugin URI: https://wordpress.org/plugins/coffee-cup-widget
Description: This plugin adds a coffee cup widget to: Appearance > Widgets.
Version: 1.0.1
Author: Coffeetravelr
Author URI: http://www.coffeetravelr.com
License: GPL2

Coffee Cup Widget is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.
 
Coffee Cup Widget is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License
along with Coffee Cup Widget. If not, see https://www.gnu.org/licenses/old-licenses/gpl-2.0.html.
*/

// The widget class
class Coffee_Cup_Widget extends WP_Widget {

	// Main constructor
	public function __construct() {
		parent::__construct(
			'coffeeCup',
			__( 'Coffee Cup Widget', 'text_domain' ),
			array(
				'customize_selective_refresh' => true,
			)
		);
	}

	// The widget form (for the backend )
	public function form( $instance ) {	

	// Set widget defaults
	$defaults = array(
		'title'    => '',
		'select'   => '',
		'checkbox'   => '',
	);
	
	// Parse current settings with defaults
	extract( wp_parse_args( ( array ) $instance, $defaults ) ); ?>

		<?php // Widget Title ?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e( 'Widget Title', 'text_domain' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
		</p>

		<?php // Dropdown ?>
		<p>
		<label for="<?php echo $this->get_field_id( 'select' ); ?>"><?php _e( 'Select Theme', 'text_domain' ); ?></label>
		<select name="<?php echo $this->get_field_name( 'select' ); ?>" id="<?php echo $this->get_field_id( 'select' ); ?>" class="widefat">
		<?php
		// Your options array
		$options = array(
			'dark' => __( 'Dark Theme', 'text_domain' ),
			'light' => __( 'Light Theme', 'text_domain' ),
		);

		// Loop through options and add each one to the select dropdown
		foreach ( $options as $key => $name ) {
			echo '<option value="' . esc_attr( $key ) . '" id="' . esc_attr( $key ) . '" '. selected( $select, $key, false ) . '>'. $name . '</option>';

		} ?>
		</select>
	</p>

	<?php // Checkbox ?>
	<p>
		<input id="<?php echo esc_attr( $this->get_field_id( 'checkbox' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'checkbox' ) ); ?>" type="checkbox" value="1" <?php checked( '1', $checkbox ); ?> />
		<label for="<?php echo esc_attr( $this->get_field_id( 'checkbox' ) ); ?>"><?php _e( 'Add <b><em>Made by Coffeetravelr</em></b> to the widget footer', 'text_domain' ); ?></label>
	</p>	

<?php
	}

	// Update widget settings
	public function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title']    = isset( $new_instance['title'] ) ? wp_strip_all_tags( $new_instance['title'] ) : '';
		$instance['select']   = isset( $new_instance['select'] ) ? wp_strip_all_tags( $new_instance['select'] ) : '';
		$instance['checkbox'] = isset( $new_instance['checkbox'] ) ? 1 : false;

		return $instance;
	}

// Display the widget
public function widget( $args, $instance ) {

	extract( $args );

	// Check the widget options
	$title    = isset( $instance['title'] ) ? apply_filters( 'widget_title', $instance['title'] ) : '';
	$select   = isset( $instance['select'] ) ? $instance['select'] : '';
	$checkbox = ! empty( $instance['checkbox'] ) ? $instance['checkbox'] : false;

	// WordPress core before_widget hook (always include )
	echo $before_widget;

   // Display the widget
   echo '<div class="widget-text wp_widget_plugin_box">';

		// Display widget title if defined
		if ( $title ) {
			echo $before_title . $title . $after_title;
		}

		// Display select field
		if ( $select &&  $checkbox == true ){
			echo '<div id="coffeeCup" data-theme="' . $select . '" data-credit="yes">

</div>';
		} elseif ( $select && $checkbox == false ){
			echo '<div id="coffeeCup" data-theme="' . $select . '" data-credit="no">

</div>';			
		}

	echo '</div>';

	// WordPress core after_widget hook (always include )
	echo $after_widget;

}

}

// Register the widget
function ccw_register_coffee_cup_widget() {
	register_widget( 'Coffee_Cup_Widget' );
}
add_action( 'widgets_init', 'ccw_register_coffee_cup_widget' );

// Load CSS
function ccw_add_plugin_stylesheet() {
	wp_register_style( 'coffee_cup_css',  plugins_url('coffee-cup-widget/css/coffeeStyle.css') );
	wp_enqueue_style('coffee_cup_css');
}
add_action( 'wp_print_styles', 'ccw_add_plugin_stylesheet' );


// Custom JS
function ccw_custom_scripts(){

      wp_register_script ('coffee_cup_js', plugins_url('coffee-cup-widget/js/coffeeCup.js'), array( 'jquery' ), 3.2, true);
      wp_enqueue_script('coffee_cup_js');

}
add_action( 'wp_enqueue_scripts', 'ccw_custom_scripts' );

?>
