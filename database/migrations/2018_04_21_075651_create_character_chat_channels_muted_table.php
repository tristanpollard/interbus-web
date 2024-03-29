<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCharacterChatChannelsMutedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('character_chat_channels_muted', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('channel_id');
            $table->bigInteger('accessor_id');
            $table->string('accessor_type');
            $table->string('reason')->nullable();
            $table->dateTime('end_at')->nullable();
            $table->timestamps();
            $table->index('channel_id');
            $table->index('accessor_id');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('character_chat_channels_muted');
    }
}
